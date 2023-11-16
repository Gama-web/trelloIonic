import { Injectable } from "@angular/core";
import { Boards } from "src/app/core/trello/entities/boards";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ListsRepository } from "src/app/core/trello/interfaces/lists.repository";
import { Lists } from "src/app/core/trello/entities/lists";
import { GetBoardUseCase } from "src/app/core/trello/use-cases/get-board.use-case";

@Injectable({providedIn: 'root'})

export class ListsStorageService implements ListsRepository{

    urlTrello = "https://api.trello.com/1/boards/"

    httpHeader = {
        headers: new HttpHeaders({ "Accept": "application/json" }),
    }

    constructor(
        public http: HttpClient,
        public getBoardUseCase: GetBoardUseCase
    ){}

    createList(lists: Lists): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    async getLists(): Promise<Lists[]> {

        const idBoard = await this.getBoardUseCase.execute()

        const httpParams = new HttpParams()
            .set("key", "64f0b6f9e2554fcd9abb93f029df64ab")
            .set("token", "ATTA24af06a4c606bf553ecd449a37e19287a4ed2513b93df878ed511fa9b0314ace37E70A37")
    
        return this.http.get<Lists[]>(this.urlTrello + idBoard + "/lists", { params: httpParams, headers: { "Accept": "application/json" }})
            .toPromise()
            .then((response) => {
                const listNames = response?.map((list) => list.name);
                return response;
            })
            .catch((error) => {
                console.log(error)
                return error
            });
    }

    updateList(id: string, updatedBoards: Lists): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    deleteList(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    
}