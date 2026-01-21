import {UserRole} from "../entities/user.entity";
import {SetMetadata} from "@nestjs/common";


export const ROLES_KEY = 'roles';

// -> roles decorator marks the routes with the roles with the roles that are allowed to access them
// -> roles guard will later read this metadata to check if the user has permission
export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);