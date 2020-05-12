import { Injectable, Logger, InternalServerErrorException, ForbiddenException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import * as config from 'config';
import * as sgMail from '@sendgrid/mail';
import { User } from '../users/interfaces/user.interface';

@Injectable()
export class SignupService {

    private logger = new Logger('SignupService');

    constructor(private readonly usersService: UsersService) {
        sgMail.setApiKey(config.get<string>('sendgrid.key'));
    }

    /**
     * Creates a new User account.
     * @param userDto User data
     * @throws {InternalServerErrorException} if the create or sendVerificationEmail methods fail
     */
    async signup(userDto: CreateUserDto): Promise<User> {
        const createUserDto: CreateUserDto = {
            ...userDto,
            email: {
                ...userDto.email,
            },
        };

        let user: User;
        try {
            user = await this.usersService.create(createUserDto);
        } catch (e) {
            this.logger.error(`Failed during signup process. DTO: ${JSON.stringify(createUserDto)}`);
            throw new InternalServerErrorException();
        }

        return user;
    }
}
