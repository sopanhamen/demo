import { BankBranchService } from '@/services/bank_branch.service'
import { BankService } from '@/services/bank.service'
import { ClientService } from '@/services/client.service'
import { ClientRequirementService } from '@/services/client_requirement.service'
import { RequirementService } from '@/services/requirement.service'
import { ClientTypeService } from '@/services/client_type.service'
import { ClientPaymentService } from '@/services/client_payment.service'
import { CommuneService } from '@/services/commune.service'
import { CompanyService } from '@/services/company.service'
import { ContactService } from '@/services/contact.service'
import { CountryService } from '@/services/country.service'
import { DeveloperService } from '@/services/developer.service'
import { DashboardService } from '@/services/dashboard.service'
import { DevelopmentTypeService } from '@/services/development_type.service'
import { DistrictService } from '@/services/district.service'
import { FacilityService } from '@/services/facility.service'
import { ListingService } from '@/services/listing.service'
import { PropertyService } from '@/services/property.service'
import { PropertyTypeService } from '@/services/property_type.service'
import { UserService } from '@/services/user.service'
import { ProjectService } from '@/services/project.service'
import { ProvinceService } from '@/services/province.service'
import { CompanyBranchService } from '@/services/company_branch.service'
import { RoleService } from '@/services/role.service'
import { UserTeamService } from '@/services/user_team.service'
import { AuthService } from '@/services/auth.service'
import { AgentService } from '@/services/agent.service'
import { SiteInquiry } from '@/services/site_inquiry.service'
import { ContactCompany } from '@/services/contact_company.service'
import { PropertyVisitService } from '@/services/property_visit.service'
import { PropertyNegotiationService } from '@/services/property_negotiation.service'
import { ForgetPassword } from '@/services/forget_password.service'
import { UpdatePassword } from '@/services/update_password.service'
import { SettingService } from '@/services/setting.service'
import { PropertyMapService } from '~/services/property_map.service'

export default ({ app: { $axios } }, inject) => {
  const bank = new BankService($axios)
  const bankBranch = new BankBranchService($axios)
  const client = new ClientService($axios)
  const clientRequirement = new ClientRequirementService($axios)
  const requirement = new RequirementService($axios)
  const clientType = new ClientTypeService($axios)
  const clientPayment = new ClientPaymentService($axios)
  const commune = new CommuneService($axios)
  const company = new CompanyService($axios)
  const companyBranch = new CompanyBranchService($axios)
  const contact = new ContactService($axios)
  const country = new CountryService($axios)
  const developer = new DeveloperService($axios)
  const dashboard = new DashboardService($axios)
  const developmentType = new DevelopmentTypeService($axios)
  const district = new DistrictService($axios)
  const facility = new FacilityService($axios)
  const listing = new ListingService($axios)
  const project = new ProjectService($axios)
  const property = new PropertyService($axios)
  const propertyVisit = new PropertyVisitService($axios)
  const propertyNegotiation = new PropertyNegotiationService($axios)
  const propertyType = new PropertyTypeService($axios)
  const province = new ProvinceService($axios)
  const auth = new AuthService($axios)
  const user = new UserService($axios)
  const agent = new AgentService($axios)
  const role = new RoleService($axios)
  const team = new UserTeamService($axios)
  const siteInquiry = new SiteInquiry($axios)
  const contactCompany = new ContactCompany($axios)
  const forgetPassword = new ForgetPassword($axios)
  const updatePassword = new UpdatePassword($axios)
  const setting = new SettingService($axios)
  const propertyMap = new PropertyMapService($axios)

  inject('service', {
    agent,
    auth,
    bank,
    bankBranch,
    client,
    clientRequirement,
    requirement,
    clientType,
    clientPayment,
    commune,
    company,
    companyBranch,
    contact,
    country,
    developer,
    dashboard,
    developmentType,
    district,
    facility,
    listing,
    project,
    property,
    propertyMap,
    propertyVisit,
    propertyNegotiation,
    propertyType,
    province,
    role,
    team,
    user,
    siteInquiry,
    contactCompany,
    forgetPassword,
    updatePassword,
    setting
  })
}
