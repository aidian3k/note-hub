export interface CreationUserRequest {
	email: string;
	password: string;
	confirmationPassword: string;
	firstName: string;
	lastName: string;
	birthdayDate: Date;
}
