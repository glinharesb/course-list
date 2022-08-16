export interface ICourse {
  id: number
  code: string
  name: string
  level: string
  grade: string
}

export interface IGrades {
  UniversityGraduate: {
    BachelorDegree: string
    Graduation: string
    Technologist: string
  }
  PostGraduate: {
    Specialization: string
    MBA: string
  }
  [key: string]: {}
}

export interface ILevels {
  UniversityGraduate: string
  PostGraduate: string
}
