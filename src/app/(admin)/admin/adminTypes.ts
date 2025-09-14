import { LucideProps } from "lucide-react";


export interface statType {
    name: string,
    stat: string,
    icon: React.ComponentType<LucideProps>,
    change: string,
    link: string;
    changeType: string,
}
export interface recentActivity {
    id: number,
    user:string,
    action:string,
    date:string,
    amount: string,
}

export type Users =     {
      _id: number;
      firstName: string;
      lastName: string;
      email:string,
      telephone: string;
      createdAt:Date;
      role: string,
      isVerified?: boolean;
    }