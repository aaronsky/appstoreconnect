import jwt from 'jsonwebtoken'

export function token(
    privateKey: jwt.Secret,
    issuerId: string,
    keyId: string
): string {
    return jwt.sign({}, privateKey, {
        algorithm: 'ES256',
        keyid: keyId,
        audience: 'appstoreconnect-v1',
        expiresIn: 1200,
        issuer: issuerId,
    })
}

export function tokenAsync(
    privateKey: jwt.Secret,
    issuerId: string,
    keyId: string
): Promise<string> {
    return new Promise((resolve, reject) => {
        jwt.sign(
            {},
            privateKey,
            {
                algorithm: 'ES256',
                keyid: keyId,
                audience: 'appstoreconnect-v1',
                expiresIn: 1200,
                issuer: issuerId,
            },
            (err: Error, token: string) => {
                if (err) {
                    reject(err)
                    return
                }
                resolve(token)
            }
        )
    })
}
