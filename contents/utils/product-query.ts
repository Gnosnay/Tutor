export const getProductInfo = async (): Promise<{ maintainerEmail: string, lastUpdateAt: string, currentVersion: string }> => {
    await new Promise(resolve => setTimeout(resolve, 3000));
    return {
        'maintainerEmail': 'test@google.com',
        'currentVersion': 'v1.2.0',
        'lastUpdateAt': "2024-02-01 14:10:00 utc",
    }
}