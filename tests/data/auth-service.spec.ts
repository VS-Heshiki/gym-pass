import { AuthUserService } from '@/data/services'
import { PrismaUsersRepositoryMock } from '../mocks/data/prisma-users-repository.mock'
import { AuthUser } from '@/domain/contracts'

import { describe, it, expect, beforeAll, beforeEach } from 'vitest'
import { compare, hashSync } from 'bcryptjs'
import { InvalidCredentialsError } from '@/data/errors'



describe('AuthUser Service', () => {
    let sut: AuthUserService
    let userRepositoryStub: PrismaUsersRepositoryMock

    beforeEach(async () => {
        userRepositoryStub = new PrismaUsersRepositoryMock()
        await userRepositoryStub.create({
            name: 'John Doe',
            email: 'john_doe@example.com',
            phone: '99999-9999',
            password_hash: hashSync('123456', 6)
        })
        sut = new AuthUserService(userRepositoryStub)
    })

    it('should prevent user to authenticate with wrong email', async () => {
        const promise = sut.execute({ email: 'doe_john@example.com', password: '123456' })

        await expect(promise).rejects.toBeInstanceOf(InvalidCredentialsError)
    })

    it('should prevent user to authenticate with wrong password', async () => {
        const promise = sut.execute({ email: 'john_doe@example.com', password: '654321' })

        await expect(promise).rejects.toBeInstanceOf(InvalidCredentialsError)
    })
})
