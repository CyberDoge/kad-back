export interface Auth {
    getUserIdByAuthorization(authorization: string): Promise<string>
    setUserIdByAuthorization(authorization: string, userId: string): Promise<void>
}
