// service/local.strategy.ts
import { Strategy as LocalStrategy } from 'passport-local';
import { PassportStatic } from 'passport';
import { UserRepository } from '../respository/user.repository';

export const configureLocalStrategy = (
    passport: PassportStatic,
    userRepository: UserRepository
) => {

    passport.use(
        new LocalStrategy(
            {
                usernameField: 'email',
                passwordField: 'password',
            },
            async (email: string, password: string, done) => {
                try {

                    const user = await userRepository.findOneByEmail(email);

                    if (!user) {
                        return done(null, false, { message: 'User not found' });
                    }

                    // For now direct comparison, add bcrypt later
                    if (user.password !== password) {
                        return done(null, false, { message: 'Invalid password' });
                    }

                    return done(null, user);
                } catch (error) {
                    return done(error);
                }
            }
        )
    );
};