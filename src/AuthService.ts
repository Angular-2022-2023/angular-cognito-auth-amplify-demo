import { Injectable } from '@angular/core';
import { AuthUser, getCurrentUser, signOut, fetchAuthSession, AuthTokens } from 'aws-amplify/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  // Récupère l'utilisateur actuellement authentifié.
  async getCurrentUser(): Promise<AuthUser> {
    return await getCurrentUser();
  }

  // Obtient les jetons de la session d'authentification actuelle.
  async getCurrentSession(): Promise<AuthTokens | undefined> {
    return (await fetchAuthSession()).tokens;
  }

  // Récupère le nom complet de l'utilisateur actuel à partir du jeton Cognito.
  async getCurrentUserFullName(): Promise<string | undefined> {
    let cognitoToken = await (await fetchAuthSession()).tokens;
    return cognitoToken?.idToken?.payload['name']?.toString();
  }

  // Déconnecte l'utilisateur actuel.
  signOut() {
    signOut();
  }

}
