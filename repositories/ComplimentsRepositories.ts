import { Repository, EntityRepository, Entity } from "typeorm";
import { Compliment } from "../database/entities/Compliments";

@EntityRepository(Compliment)
class ComplimentsRepositories extends Repository<Compliment>{}

export { ComplimentsRepositories };