// author: qiwei sun
// date: 2022/07/15
// description: This file list all the back end services provided by the advisor
import AdvisorModel from "./advisor.model"
import Advisor from "./advisor.interface"
export default class AdvisorService {
    private advisor = AdvisorModel;
    //create a advisor
    public async create(advisor: Advisor): Promise<Advisor> {
        try {
            const createdAdvisor = await this.advisor.create(advisor);
            return createdAdvisor;
        } catch (err) {
            console.log(err)
            throw new Error("Unable to create advisor.");
        }
    }
    //get all advisor
    public async getAdvisor(): Promise<Advisor[]> {
        try {
            const advisors = await this.advisor.find();
            console.log(advisors)
            return advisors;
        } catch (err) {
            throw new Error("Unable to get advisor.");
        }
    }
    //get one advisor by his/her id
    public async getOne(id:number): Promise<Advisor|null>{
        try {
            const advisors = await this.advisor.findOne({id});
            return advisors;
        } catch (err) {
            throw new Error("Unable to get advisor.");
        }
    }
    // get one advisor by his/her name
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
