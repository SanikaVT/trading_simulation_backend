import AdvisorModel from "./advisor.model"
import Advisor from "./advisor.interface"

export default class AdvisorService {
    private advisor = AdvisorModel;

    public async create(advisor: Advisor): Promise<Advisor> {
        try {
            const createdAdvisor = await this.advisor.create(advisor);
            return createdAdvisor;
        } catch (err) {
            console.log(err)
            throw new Error("Unable to create advisor.");
        }
    }

    public async getAdvisor(): Promise<Advisor[]> {
        try {
            const advisors = await this.advisor.find();
            console.log(advisors)
            return advisors;
        } catch (err) {
            throw new Error("Unable to get advisor.");
        }
    }

    public async getOne(id:number): Promise<Advisor|null>{
        try {
            const advisors = await this.advisor.findOne({id});
            return advisors;
        } catch (err) {
            throw new Error("Unable to get advisor.");
        }
    }

    public async getOneByName(fullName: string): Promise<Advisor | null> {
        try {
            const advisors = await this.advisor.findOne({ fullName });
            return advisors;
        } catch (err) {
            console.log(err)
            throw new Error("Unable to get advisor.");
        }
    }


   
}
