using Component.JQGrid;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Dynamic;
using System.Threading;

namespace GridImplementation.Components
{
    public class PersonComponent
    {
        public List<GridProperties> GetAll()
        {
            var contactList = new List<GridProperties>();

            for (var i = 1; i <= 97; i++)
            {
                contactList.Add(new GridProperties
                {
                    FirstName = i % 4 == 0 ? "Rama" : "Shyama",
                    LastName = i % 3 == 0 ? "Mahapatra" : "Nayak",
                    Age = i,
                    DateOfBirth = "05/01/1992",
                    Gender = i % 2 == 0 ? "Male" : "Female"
                });
            }

            return contactList;
        }

        public JGridPagedResult<GridProperties> GetPersons(string sidx, string sord, int page, int rows)
        {
            Thread.Sleep(3000);
            //Query to get all persons.
            IQueryable<GridProperties> objPerson = GetAll().AsQueryable();

            List<GridProperties> personList;

            //To sort order using dynamic linq.
            if (!string.IsNullOrWhiteSpace(sidx) && !string.IsNullOrWhiteSpace(sord))
            {
                personList = objPerson.OrderBy(sidx, sord).Skip((page - 1) * rows).Take(rows).ToList();
            }
            else
            {
                personList = objPerson.OrderBy(r => r.FirstName).Skip((page - 1) * rows).Take(rows).ToList();
            }

            var pageSize = rows;
            var totalRecords = objPerson.Count();
            var totalPages = (int)Math.Ceiling(totalRecords / (float)pageSize);

            //To make jgrid paged result format.
            return new JGridPagedResult<GridProperties>
                {
                    totalPages = totalPages,
                    rows = personList,
                    totalRecords = totalRecords
                };
        }

        public class GridProperties : JGridBindableObjects
        {
            public string FirstName { get; set; }

            public string LastName { get; set; }

            public int Age { get; set; }

            public string DateOfBirth { get; set; }

            public string Gender { get; set; }
        }
    }
}