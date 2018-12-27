import jwt from 'jsonwebtoken'

const jwtOptions = (iss: string, kid: string) => ({
    algorithm: 'ES256',
    keyid: kid,
    audience: 'appstoreconnect-v1',
    expiresIn: 1200,
    issuer: iss,
})

export function token(
    privateKey: jwt.Secret,
    issuerId: string,
    keyId: string
): string {
    return jwt.sign({}, privateKey, jwtOptions(issuerId, keyId))
}

export function tokenAsync(
    privateKey: jwt.Secret,
    issuerId: string,
    keyId: string
): Promise<string> {
    return new Promise((resolve, reject) => {
        jwt.sign({}, privateKey, jwtOptions(issuerId, keyId), (err, token) => {
            if (err) {
                reject(err)
                return
            }
            resolve(token)
        })
    })
}
