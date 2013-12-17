using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Activation;
using System.ServiceModel.Web;
using System.Text;
using Component.JQGrid;
using GridImplementation.Components;

namespace GridImplementation2010
{
    [ServiceContract(Namespace = "")]
    [AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Allowed)]
    public class Service1
    {
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        [OperationContract]
        public JGridPagedResult<PersonComponent.GridProperties> GetPersons(string sidx, string sord, int page, int rows)
        {
            var personComponent = new PersonComponent();
            return personComponent.GetPersons(sidx, sord, page, rows);
        }
    }
}
