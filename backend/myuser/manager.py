from django.contrib.auth.base_user import BaseUserManager
from django.contrib import auth
class UserManager(BaseUserManager):
    use_in_migrations = True

    

    def _create_user(self, username, email, password, **extra_fields):
        if not email:
            raise ValueError('Invalid email address')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.username = username
        user.save(using=self._db)
        return user
    
    def create_user(self, username, email=None, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(username, email, password, **extra_fields)
    
    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self._create_user(email, password, **extra_fields)
    
    def with_perm(self, perm, is_active=True, include_superuser=True, backend=None, **extra_fields):
        """
        perm - permission of current user
        is_active - status of current user
        include_superuser - 
        backend - 
        
        
        """
        if not backend:
            backends = auth._get_backends(return_tuple=True)

            if len(backends) == 1:
                backend,  _ = backends
            else:
                raise ValueError(
                    'You must provide a backend to with_perm because you have multiple authentication ')
        elif not isinstance(backend, str):
            raise TypeError('backend must be a string')
        else:
            backend = auth.load_backend(backend)
        if hasattr(backend, 'with_perm'):
            return backend.with_perm(perm, is_active, include_superuser,  self.model)
        return self.none()