import { Test } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

const mockUsersService = () => ({
    create: jest.fn(),
    findUserById: jest.fn(),
    updateUser: jest.fn(),
    deleteUser: jest.fn(),
    addAvatar: jest.fn(),
    deleteAvatarByUserId: jest.fn(),
});

const mockUser: any = {
    _id : '5e286b8940b3a61cacd8667d',
    name : 'Jenny',
    email : {
        address: 'jenny.email@emailsite.com',
    },
    password : '$2b$08$gTuxdD.U26AgUfcDpqIS7unCzyWUV1tQB2681ZFRv95gki5e3TxSS',
    tokens : [],
    avatar: undefined,
};

const mockReq = {
    user: {
        _id: 'id',
    },
};

describe('UsersController', () => {
    let usersController: UsersController;
    let usersService;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            controllers: [UsersController],
            providers: [
                {
                    provide: UsersService,
                    useFactory: mockUsersService,
                },
            ],
        })
        .overrideGuard(AuthGuard())
        .useValue({ canActivate: () => true })
        .compile();

        usersController = module.get<UsersController>(UsersController);
        usersService = module.get<UsersService>(UsersService);
    });

    describe('findUserById', () => {
        it('should return user request object provided by JWT strategy', async () => {
            const result = await usersController.findUserById(mockReq);
            expect(result).toEqual(mockReq.user);
        });
    });

    describe('updateUser', () => {
        it('should update a user', async () => {
            usersService.updateUser.mockResolvedValue(mockUser);
            const updateUserDto: UpdateUserDto = {
                email: {
                    address: 'new.email@addr.co',
                },
            };

            expect(usersService.updateUser).not.toHaveBeenCalled();
            const result = await usersController.updateUser(mockReq, updateUserDto);
            expect(usersService.updateUser).toHaveBeenCalledWith(mockReq.user._id, updateUserDto);
            expect(result).toEqual(mockUser);
        });
    });

    describe('deleteUser', () => {
        it('should delete a user', async () => {
            usersService.deleteUser.mockResolvedValue('success');

            expect(usersService.deleteUser).not.toHaveBeenCalled();
            const result = await usersController.deleteUser(mockReq);
            expect(usersService.deleteUser).toHaveBeenCalledWith(mockReq.user._id);
            expect(result).toEqual('success');
        });
    });

    describe('saveAvatar', () => {
        it('should save a user avatar', async () => {
            usersService.addAvatar.mockResolvedValue(mockUser);

            expect(usersService.addAvatar).not.toHaveBeenCalled();
            const result = await usersController.saveAvatar(mockReq, { buffer: 'image' });
            expect(usersService.addAvatar).toHaveBeenCalledWith(mockReq.user._id, 'image');
            expect(result).toEqual(mockUser);
        });
    });

    describe('deleteAvatar', () => {
        it('should delete a user avatar', async () => {
            usersService.deleteAvatarByUserId.mockResolvedValue(mockUser);

            expect(usersService.deleteAvatarByUserId).not.toHaveBeenCalled();
            const result = await usersController.deleteAvatar(mockReq);
            expect(usersService.deleteAvatarByUserId).toHaveBeenCalledWith(mockReq.user._id);
            expect(result).toEqual(mockUser);
        });
    });
});
