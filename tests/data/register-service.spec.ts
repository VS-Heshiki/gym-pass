import { CreateUserService } from '@/data/services'
import { CreateUser } from '@/domain/contracts'
import { PrismaUsersRepositoryMock } from '../mocks/data/prisma-users-repository.mock'

import { describe, it, expect, beforeAll, beforeEach } from 'vitest'
import { compare } from 'bcryptjs'



describe('CreateUser Service', () => {
    let sut: CreateUserService
    let userRepositoryStub: PrismaUsersRepositoryMock
    let user: CreateUser.Input

    beforeAll(() => {
        userRepositoryStub = new PrismaUsersRepositoryMock()
        user = ({
            name: 'John Doe',
            email: 'john.doe@example.com',
            phone: '99999-9999',
            password: '123456'
        })
    })

    beforeEach(() => {
        sut = new CreateUserService(userRepositoryStub)
    })

    it('should hash user password upon registration', async () => {
        const resolve = await sut.execute(user)

        const hashed = await compare('123456', resolve.password_hash)

        expect(hashed).toBeTruthy()
    })
})
