import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";




const s3Client = new S3Client({
  credentials: {
    accessKeyId: "AKIAYOMHMVGBYI3UPNZ5",
    secretAccessKey: "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",
  },
  region: "us-east-1",
});

console.log(process.env.AWS_BUCKET_REGION);


// Send the upload to S3


export async function uploadImageToS3(userId:string,image:any,type:any){
    console.log(userId,image,type);
    
    try {
        const uploadParams = {
          Bucket: "connectify-bucket",
          Body: userId,
          Key: image,
          ContentType: type,
        };

        const command = new PutObjectCommand(uploadParams)

        await s3Client.send(command);
    } catch (error) {
       
        
        // console.log('error here', s3Client);
        console.log(error);
        
        
    }
    
}