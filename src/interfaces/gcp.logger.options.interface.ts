import { CredentialBody } from 'google-auth-library/build/src/auth/credentials';

export interface GCPLoggerOptionsInterface {
    service?: string;
    serviceAccountKey?: CredentialBody;
    type: string;
    level: string;
    projectId: string;
}
