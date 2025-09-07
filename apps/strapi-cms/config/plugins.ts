// ./config/plugins.ts
export default ({ env }) => ({
  upload: {
    config: {
      provider: '@strapi/provider-upload-aws-s3',
      providerOptions: {
        s3Options: {
          region: env('AWS_REGION', 'ap-south-1'),
          credentials: {
            // Use the standard env names — change your .env accordingly
            accessKeyId: env('AWS_ACCESS_KEY_ID'),
            secretAccessKey: env('AWS_ACCESS_SECRET'),
            // include only if using temporary STS creds
            sessionToken: env('AWS_SESSION_TOKEN'),
          },
          // Leave this false for real AWS S3 (virtual-hosted style)
          forcePathStyle: false,
        },
        params: {
          Bucket: env('AWS_BUCKET'),
          ACL: env('AWS_S3_ACL', 'public-read'), // or 'private'
        },
        // optional: baseUrl if you serve via CloudFront
        // baseUrl: env('AWS_S3_BASE_URL'),
      },
      actionOptions: {
        upload: {},
        uploadStream: {},
        delete: {},
      },
    },
  },
});
