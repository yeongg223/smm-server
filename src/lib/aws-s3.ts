import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { env } from "./dot-env";

export class AwsS3Api {
  private static s3 = new S3Client({
    region: "ap-northeast-2",
    credentials: {
      accessKeyId: env.AWS_ACCESS_KEY,
      secretAccessKey: env.AWS_SECRET_KEY,
    },
  });

  static async upload(key: string, file: Express.Multer.File) {
    await this.s3.send(
      new PutObjectCommand({
        Bucket: env.AWS_S3_BUCKET!,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
      }),
    );

    return {
      key,
    };
  }
}
