export async function getAppUrl(path:string) {
    const appUrl = process.env.NEXT_PUBLIC_URL
    return`${appUrl}/${path}`
}