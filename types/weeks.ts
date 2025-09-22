export interface WeekInfo {
    week: number;
    daysUntilDue: number;
    baby: {
        week: number;
        size: number;
        weight: number;
        analogy: string;
        activity: string;
        development: string;
        fact: string;
        image: string;
        momDailyTips: string[];
    };
    momTip: string;
}

export interface BabyDetails {
    week: number;
    size: number;
    weight: number;
    analogy: string;
    activity: string;
    development: string;
    fact: string;
    image: string;
    momDailyTips: string[];
}

export interface MomDetails{
    week: number;
    feelings: {
        states: string[];
    };
    sensationDescr: string;
    comfortTips: {
        category: string;
        tip: string;
    }[];
}