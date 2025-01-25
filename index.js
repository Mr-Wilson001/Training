// Define Base class(Person)
class Person {
    constructor(name, age, sex) {
        this.name = name;
        this.age = age;
        this.sex = sex;
        if (this.constructor === Person) {
            throw new Error("This class cannot be called");
        }
    }

    viewDetails() {
        return `Name: ${this.name}\nAge: ${this.age}\nSex: ${this.sex}`;
    }
}

// Define sub class
class Student extends Person {
    static students = [];
    #address;
    #parentOrGuardian;

    constructor(name, id, age, sex, level, courses = [], address, parentOrGuardian) {
        super(name, age, sex);
        this.id = id;
        this.level = level;
        this.courses = courses;
        this.#address = address;
        this.#parentOrGuardian = parentOrGuardian;
    }
    get address() {
        return this.#address;   
    }
    get parentOrGuardian() {
        return this.#parentOrGuardian;  
    }

    // Method to add a new student
    static addStudent(name, id, age, sex, level, courses, address, parentOrGuardian) {
        const newStudent = new Student(name, id, age, sex, level, courses, address, parentOrGuardian);
        Student.students.push(newStudent);
        console.log(`${name} with ID: ${id}, added successfully`);
    }

    // Method to view student details
    static viewStudentDetails(name) {
        const student = Student.students.find((student) => student.name === name);
        if (!student) {
            return `No student with that name found`;
        }
        return student.viewDetails();
    }

    viewDetails() {
        let courseDetails = this.courses.map(course => course.viewDetails()).join('\n        ');
        let averageGrade = this.calculateAverageGrade();
        let totalUnitscore = this.calculateTotalUnitscore();
        let cgpa = this.calculateCgpa(averageGrade);

        return `Name: ${this.name}\nID: ${this.id}\nAge: ${this.age}\nSex: ${this.sex}\nLevel: ${this.level}l\nCourses:\n        ${courseDetails}\nAverage Grade/CGPA: ${averageGrade}, ${cgpa} student`;
    }

    calculateAverageGrade() {
        if (this.courses.length === 0) return 0;
        let totalUnitScore = this.calculateTotalUnitscore();
        let totalCreditLoad = this.courses.reduce((sum, course) => sum + course.creditLoad, 0);
        return (totalUnitScore / totalCreditLoad).toFixed(2);
    }

    calculateGrade(score) {
        if (score >= 70) return 'A';
        if (score >= 60) return 'B';
        if (score >= 50) return 'C';
        if (score >= 45) return 'D';
        if (score >= 40) return 'E';
        return 'F';
    }

    calculateGradeUnit(grade) {
        if (grade === 'A') return 5;
        if (grade === 'B') return 4;
        if (grade === 'C') return 3;
        if (grade === 'D') return 2;
        if (grade === 'E') return 1;
        return 0;
    }

    calculateTotalUnitscore() {
        const totalUnitScore = this.courses.reduce((sum, course) => {
            let grade = this.calculateGrade(course.score);
            let gradeUnit = this.calculateGradeUnit(grade);
            return sum + (gradeUnit * course.creditLoad);
        }, 0);
        return totalUnitScore;
    }

    calculateCgpa(cgpa) {
        if (cgpa >= 4.5) return 'First Class';
        if (cgpa >= 3.5) return 'Second Class Upper';
        if (cgpa >= 2.5) return 'Second Class Lower';
        if (cgpa >= 1.5) return 'Third Class';
        return 'Fail';
    }
}

// Define a class for courses
class Course {
    constructor(name, code, creditLoad, score) {
        this.name = name;
        this.code = code;
        this.creditLoad = creditLoad;
        this.score = score;
        this.grade = this.calculateGrade(score);
    }

    calculateGrade(score) {
        if (score >= 70) return 'A';
        if (score >= 60) return 'B';
        if (score >= 50) return 'C';
        if (score >= 45) return 'D';
        if (score >= 40) return 'E';
        return 'F';
    }

    viewDetails() {
        return `${this.name}: ${this.code}, score: ${this.score}, grade: ${this.grade}, credit load: ${this.creditLoad}`;
    }
}

// Example usage
const mathematicsDeptCourses = [
    new Course("Mathematics", 101, 3, 90),
    new Course("Mathematics", 102, 3, 80),
    new Course("Mathematics", 103, 2, 60),
    new Course("Mathematics", 104, 1, 80),
];

const historyDeptCourses = [
    new Course("History", 101, 3, 75),
    new Course("History", 102, 2, 65),
    new Course("History", 103, 2, 60),
    new Course("History", 104, 2, 50),
];

Student.addStudent("Ogugor Chigozie", "SCH101", 19, "M", 100, mathematicsDeptCourses, "No 32 majuo street, Awka", "Mr. and Mrs. Ogugor");
Student.addStudent("Okeke Chikaima", "SCH102", 20, "F", 100, historyDeptCourses, "No. 39 lions street, Amawbia", "Mr. and Mrs. Okeke");

// View details of a specific student by name
console.log("\nDetails of Student: Ogugor Chigozie\n");
console.log(Student.viewStudentDetails("Ogugor Chigozie"));

console.log("\nDetails of Student: Okeke Chikaima\n");
console.log(Student.viewStudentDetails("Okeke Chikaima"));