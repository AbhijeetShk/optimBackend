#include <bits/stdc++.h>
using namespace std;


class Employee {
protected:
    string name;
    int id;

public:

    static int employeeCount;


    Employee(string name, int id) {
        this->name = name;
        this->id = id;
        employeeCount++;

        cout << "Employee constructor called\n";
    }


    virtual void calculateSalary() = 0;


    void showDetails() {
        cout << "Name: " << name << endl;
        cout << "ID: " << id << endl;
    }


    virtual ~Employee() {
        cout << "Employee destructor called\n";
    }
};

int Employee::employeeCount = 0;



class Developer : public Employee {
private:
    int bonus;
    int* rating;

public:


    Developer(string name, int id, int bonus, int ratingValue)
        : Employee(name, id)
    {
        this->bonus = bonus;

        rating = new int(ratingValue);

        cout << "Developer constructor called\n";
    }

    Developer(const Developer& other)
        : Employee(other.name, other.id)
    {
        bonus = other.bonus;

        rating = new int(*(other.rating));

        cout << "Copy constructor called\n";
    }

    // FUNCTION OVERRIDING
    void calculateSalary() override {
        int salary = 50000 + bonus;

        cout << "Developer Salary: "
             << salary << endl;
    }

    // FRIEND FUNCTION
    friend void showRating(Developer& d);

    // STATIC FUNCTION
    static void totalEmployees() {
        cout << "Total Employees: "
             << employeeCount << endl;
    }

    // DESTRUCTOR
    ~Developer() {
        delete rating;

        cout << "Developer destructor called\n";
    }
};


// FRIEND FUNCTION
void showRating(Developer& d) {
    cout << "Rating: "
         << *(d.rating) << endl;
}



// MULTILEVEL INHERITANCE
class SeniorDeveloper : public Developer {
private:
    string techStack;

public:
    SeniorDeveloper(
        string name,
        int id,
        int bonus,
        int rating,
        string techStack
    )
        : Developer(name, id, bonus, rating)
    {
        this->techStack = techStack;

        cout << "Senior Developer constructor called\n";
    }

    // OVERRIDING
    void calculateSalary() override {
        cout << "Senior Developer Salary: 120000\n";
    }

    ~SeniorDeveloper() {
        cout << "Senior Developer destructor called\n";
    }
};




int main() {

    cout << "\n--- OBJECT CREATION ---\n";


    Developer d1("Abhi", 101, 10000, 5);

    cout << "\n--- SHOW DETAILS ---\n";

    d1.showDetails();

    cout << "\n--- runtime POLYMORPHISM ---\n";

    
    Employee* emp = new Developer("Rahul", 102, 8000, 4);

    emp->calculateSalary();

    cout << "\n--- FRIEND FUNCTION ---\n";

    showRating(d1);

    cout << "\n--- COPY CONSTRUCTOR ---\n";

    Developer d2 = d1;

    cout << "\n--- STATIC FUNCTION ---\n";

    Developer::totalEmployees();

    cout << "\n--- MULTILEVEL INHERITANCE ---\n";

    Employee* senior =
        new SeniorDeveloper(
            "Karan",
            103,
            20000,
            5,
            "MERN"
        );

    senior->calculateSalary();

    cout << "\n--- DESTRUCTOR CALLS ---\n";

    delete emp;

    delete senior;

    return 0;
}