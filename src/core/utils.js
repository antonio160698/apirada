function ActualDay(datestring) {

    switch(new Date(datestring).getDay()) {
        case 0:
            return "Lunes";
        case 1:
            return "Martes";
        case 2:
            return "Miercoles";
        case 3:
            return "Jueves";
        case 4:
            return "Viernes";
        case 5:
            return "Sabado";
        case 6:
            return "Domingo";
    }
    
}

// Constants:
const _ARR_ACADEMY_HOURS = ['M1', 'M2', 'M3', 'M4', 'M5', 'M6', 
                            'V1', 'V2', 'V3', 'V4', 'V5', 'V6',
                            'N1', 'N2', 'N3', 'N4', 'N5', 'N6']

let AcademyHours = {
    getAllHours: ()         => { return _ARR_ACADEMY_HOURS },
    getMatutineHours: ()    => { return ['M1', 'M2', 'M3', 'M4', 'M5', 'M6'] },
    getVespertineHours: ()  => { return ['V1', 'V2', 'V3', 'V4', 'V5', 'V6'] },
    getNocturneHours: ()    => { return ['N1', 'N2', 'N3', 'N4', 'N5', 'N6'] }
}

let routeStatus = {
    Recent : "Recent",
    InProgress: "InProgress",
    Complete: "Complete"
}

module.exports = {
    ActualDay    : ActualDay,
    AcademyHours : AcademyHours,
    routeStatus  : routeStatus
}