import { AbilityBuilder } from '@casl/ability';
import { createPrismaAbility } from '@casl/prisma';
import { User } from '../schemas/schemas.js';

export function defineAbility(user:User) {
  const { can, build } = new AbilityBuilder(createPrismaAbility);

  if (!user) return build();

  // Admin shortcut
  if (user.roles.some(r => r.name === 'admin')) {
    can('manage', 'all');
    return build();
  }

  // DB-driven permissions (like Spatie)
  user.roles.forEach(role => {
    role.permissions.forEach(permission => {
      const [action, subject] = permission.name.split(' ');
      can(action, subject);
    });
  });

  return build();
}
