import { PrismaClient } from '@prisma/client';
import { env } from './env';

class Database {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient({
      datasources: {
        db: {
          url: `mysql://${env.dbUser}:${env.dbPassword}@${env.dbHost}:3306/${env.dbName}`,
        },
      },
    });
    
    this.setupErrorHandling();
  }

  private setupErrorHandling(): void {
    this.prisma.$on('error', (error: any) => {
      console.error('Database connection error:', error);
      process.exit(1);
    });
  }

  public getClient(): PrismaClient {
    return this.prisma;
  }

  public async connect(): Promise<void> {
    try {
      await this.prisma.$connect();
      console.log('Database connected successfully.');
    } catch (error) {
      console.error('Error connecting to the database:', error);
      process.exit(1);
    }
  }

  public async disconnect(): Promise<void> {
    await this.prisma.$disconnect();
  }
}

export const db = new Database();
