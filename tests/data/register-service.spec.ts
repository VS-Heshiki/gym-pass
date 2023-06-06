import { CreateUserService } from '@/data/services'
import { CreateUser } from '@/domain/contracts'
import { PrismaUsersRepositoryMock } from '../mocks/data/prisma-users-repository.mock'
import { UserAlreadyExistsError } from '@/data/errors'

import { describe, it, expect, beforeAll, beforeEach } from 'vitest'
import { compare } from 'bcryptjs'



describe('CreateUser Service', () => {
    let sut: CreateUserService
    let userRepositoryStub: PrismaUsersRepositoryMock
    let user: CreateUser.Input

    beforeAll(() => {
        user = ({
            name: 'John Doe',
            email: 'john.doe@example.com',
            phone: '99999-9999',
            password: '123456'
        })
    })

    beforeEach(() => {
        userRepositoryStub = new PrismaUsersRepositoryMock()
        sut = new CreateUserService(userRepositoryStub)
    })

    it('should hash user password upon registration', async () => {
        const resolve = await sut.execute(user)

        const hashed = await compare('123456', resolve.password_hash)

        expect(hashed).toBeTruthy()
    })

    it('should not allow registrate with same email twice', async () => {
        await sut.execute(user)
        const promise = sut.execute(user)

        await expect(promise).rejects.toBeInstanceOf(UserAlreadyExistsError)
    })
})
