export interface Auth {
    getUserIdByAuthorization(authorization: string): Promise<string | undefined>
    setUserIdByAuthorization(authorization: string, userId: string): Promise<void>
}
