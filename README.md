# **Implémentation de l'authentification Amazon Cognito dans Angular en utilisant AWS Amplify**

[Definitions](https://www.notion.so/Definitions-8edddc41fd6a4180b803884a3cf734b6?pvs=21)

### **Étapes**

1. Créez un pool d'utilisateurs Amazon Cognito. 
2. Pour installer Angular CLI, ouvrez une fenêtre de terminal et exécutez la commande suivante :
    
    ```bash
    npm install -g @angular/cli
    ```
    
3. Exécutez la commande ci-dessous pour créer un nouveau projet Angular.
    
    ```bash
    ng new hello-world --no-standalone
    ```
    
4. Installez la bibliothèque **`@aws-amplify/ui-angular`** ainsi que **`aws-amplify`** si ce n'est pas déjà fait :
    
    ```bash
    npm install aws-amplify @aws-amplify/ui-angular
    ```
    
5. Utilisez le code suivant pour configurer l'application AWS Amplify avec des ressources AWS existantes.
    
    ```tsx
    Amplify.configure({
      Auth: {
        Cognito: {
          userPoolId: 'ap-south-1_xxxxx',
          userPoolClientId: '71h7gnxxxxxxxxx'
        }
      }
    });
    ```
    
6. Pour le CSS, utilisez le code ci-dessous :
    
    ```scss
    @import '@aws-amplify/ui/dist/styles.css';
    
    ```
    
7. Ajoutez le composant d'authentification dans le fichier HTML.
    
    ```html
    <amplify-authenticator>
      <ng-template
        amplifySlot="authenticated"
        let-user="user"
        let-signOut="signOut"
      >
        <h1>Bienvenue {{ user.username }} !</h1>
        <button (click)="signOut()">Déconnexion</button>
      </ng-template>
    </amplify-authenticator>
    ```
    
8. Mettez à jour le composant d'authentification avec les champs d'inscription.
    
    ```html
    <amplify-authenticator [loginMechanisms]="['email']" [signUpAttributes]="['name']">
    ```
    
    **Référence** - [Sign Up Attributes](https://ui.docs.amplify.aws/angular/connected-components/authenticator/configuration#sign-up-attributes)
    
9. Pour mettre à jour l'ordre des champs, utilisez l'attribut **`formFields`**.
    
    ```html
    <amplify-authenticator [loginMechanisms]="['email']" [formFields]="formFields" [signUpAttributes]="['name']">
    
    ```
    
    ```tsx
    formFields = {
        signUp: {
          name: {
            order: 1
          },
          email: {
            order: 2
          },
          password: {
            order: 5
          },
          confirm_password: {
            order: 6
          }
        },
      };
    
    ```
    
10. Créez le fichier **`src/polyfills.ts`** et ajoutez ce qui suit :

 Cette étape est nécessaire pour assurer la compatibilité avec certaines bibliothèques JavaScript qui s'attendent à un environnement de type Node.js en ajoutant des objets globaux comme **`global`** et **`process`**. Cela permet d'éviter des erreurs lors de l'exécution de l'application Angular dans un navigateur.

```tsx
(window as any).global = window;
(window as any).process = {
  env: { DEBUG: undefined },
};
```

1. Ensuite, ouvrez votre fichier **`angular.json`** et ajoutez **`src/polyfills.ts`** au tableau **`polyfills`** dans votre **`angular.json`**.
    
    ```tsx
    "polyfills": [
      "zone.js",
      "src/polyfills.ts"
    ],
    
    ```
    
2. Enfin, assurez-vous d'ajouter **`src/polyfills`** aux fichiers dans votre **`tsconfig`**.
    
    ```tsx
    {
      "files": [
        "src/main.ts",
        "src/polyfills.ts"
      ],
    }
    
    ```
    
3. Pour obtenir le JWT Token et les détails de l'utilisateur, créez une classe **`AuthService.ts`**.
    
    ```tsx
    import { Injectable } from '@angular/core';
    import { AuthUser, getCurrentUser, signOut, fetchAuthSession, AuthTokens } from 'aws-amplify/auth';
    
    @Injectable({
      providedIn: 'root'
    })
    export class AuthService {
    
      constructor() { }
    
      async getCurrentUser(): Promise<AuthUser> {
        return await getCurrentUser();
      }
    
      async getCurrentSession(): Promise<AuthTokens | undefined> {
        return (await fetchAuthSession()).tokens;
      }
    
      async getCurrentUserFullName(): Promise<string | undefined> {
        let cognitoToken = await (await fetchAuthSession()).tokens;
        return cognitoToken?.idToken?.payload['name']?.toString();
      }
    
      signOut() {
        signOut();
      }
    
    }
    
    ```
    

### **Références**

- [Guide d'installation](https://ui.docs.amplify.aws/angular/getting-started/installation)
- [Composants connectés Authenticator](https://ui.docs.amplify.aws/angular/connected-components/authenticator)
