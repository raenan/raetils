
export class Task{

    description:string = 'cowboy';
    notes:string;
    label:string; //i.e. Writing, Chores, Programming, Exercise
    tag:string; //i.e. (editing, drafting), (cleaning, organizing), (angular, java), (glutes, legs)
    priority:number; //for sorting tasks by importance
    created:string; //dates formed into strings for convenience
    completed:string; //no further manipulation should be needed on the dates
}