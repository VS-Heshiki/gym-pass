import { GetUserByIdService } from '@/data/services'
import { PrismaUsersRepositoryMock } from '../mocks/data/prisma-users-repository.mock'

import { describe, it, expect, beforeEach } from 'vitest'
import { hashSync } from 'bcryptjs'
import { ResourceNotFoundError } from '@/data/errors'
import { User } from '@prisma/client'

describe('GetUserById Service', () => {
    let sut: GetUserByIdService
    let userRepositoryStub: PrismaUsersRepositoryMock
    let user: User

    beforeEach(async () => {
        userRepositoryStub = new PrismaUsersRepositoryMock()
        user = await userRepositoryStub.register({
            name: 'John Doe',
            email: 'john_doe@example.com',
            phone: '99999-9999',
            password_hash: hashSync('123456', 6)
        })
        sut = new GetUserByIdService(userRepositoryStub)
    })

    it('should be able to get a user by id', async () => {
        const resolve = await sut.execute({ userId: user.id })

        expect(resolve.id).toEqual(expect.any(String))
        expect(resolve).toContain({
            name: 'John Doe',
            email: 'john_doe@example.com',
            phone: '99999-9999'
        })
    })

    it('should refuse if user id not found', async () => {
        const resolve = sut.execute({ userId: 'non-exists-id' })

        await expect(resolve).rejects.toBeInstanceOf(ResourceNotFoundError)
    })
})
