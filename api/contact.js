class Contact {
    constructor(
        name, 
        status,
        seekerPath,
        faithMilestones,
        assignedTo,
        locations,
        groups
    ) {
        this.name = name;
        this.status = status;
        this.seekerPath = seekerPath;
        this.faihtMilestones = faithMilestones;
        this.assignedTo = assignedTo;
        this.locations = locations;
        this.groups = groups;
    }

    get name() { return this.name; } 
    get status() { return this.status; } 
    get seekerPath() { return this.seekerPath; } 
    get faithMilestones() { return this.faithMilestones; } 
    get assignedTo() { return this.assignedTo; } 
    get locations() { return this.locations; } 
    get groups() { return this.groups; } 
}