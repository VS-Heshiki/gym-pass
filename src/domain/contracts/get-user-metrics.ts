export interface GetUserMetrics {
    execute (params: GetUserMetrics.Input): Promise<number>
}

export namespace GetUserMetrics {
    export type Input = {
        userId: string
    }
}
