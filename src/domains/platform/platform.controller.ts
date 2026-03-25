import multer from "multer";
import { adminGuard } from "src/guards/admin.guads";
import { platformModifyGuard } from "src/guards/platform-modify-guard";
import { AwsS3Api } from "src/lib/aws-s3";
import { prisma } from "src/lib/prisma";
import { withGuard } from "src/lib/utils";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
});

class PlatfomController {
  updateFavicon = withGuard(platformModifyGuard, async (req, res) => {
    try {
      const { siteId, type } = req.body;
      const file = req.file;

      if (!file) return res.status(400).json({ error: "파일 없음" });
      if (!["logo", "favicon"].includes(type))
        return res.status(400).json({ error: "Type이 다릅니다" });

      if (!file.mimetype.startsWith("image/")) {
        return res.status(400).json({ error: "이미지만 업로드 가능합니다" });
      }

      const ext = file.originalname.split(".").pop();
      const key = `${siteId}/${type}.${ext}`;

      await AwsS3Api.upload(key, req.file!);

      res.sendStatus(200);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "업로드 실패" });
    }
  });

  getMyPlatform = withGuard(adminGuard, async (req, res) => {
    const myPlatform = await prisma.site.findFirst({
      where: { adminId: req.admin!.id },
      include: {
        admin: {
          select: {
            username: true,
          },
        },
      },
    });

    if (!myPlatform) {
      return res.json(null);
    }

    res.json({
      id: myPlatform?.id,
      siteKey: myPlatform?.siteKey,
      siteName: myPlatform?.siteName,
      enabled: myPlatform?.enabled,
      createdAt: myPlatform?.createdAt,
      adminUserName: myPlatform?.admin?.username,
    });
  });
}

export const platfomController = new PlatfomController();
