package learn.field_agent.domain;

import learn.field_agent.data.AgencyAgentRepository;
import learn.field_agent.data.SecurityClearanceRepository;
import learn.field_agent.models.AgencyAgent;
import learn.field_agent.models.SecurityClearance;
import org.springframework.stereotype.Service;
import java.util.List;
import org.springframework.dao.DataIntegrityViolationException;

@Service
public class SecurityClearanceService {

    private final SecurityClearanceRepository repository;

    private AgencyAgentRepository agencyAgentRepository;

    public SecurityClearanceService(SecurityClearanceRepository repository, AgencyAgentRepository agencyAgentRepository){
        this.repository = repository;
        this.agencyAgentRepository = agencyAgentRepository;
    }

//    public List<AgencyAgent> agencyAgents = agencyAgentRepository.findAll();

    public List<SecurityClearance> findAll(){
        return repository.findAll();
    }

    public SecurityClearance findById(int securityClearanceId){
        return repository.findById(securityClearanceId);
    }

//    public SecurityClearance findByName(String name){
//        return repository.findByName(name);
//    }

    public Result<SecurityClearance> update(SecurityClearance securityClearance) {
        Result<SecurityClearance> result = validate(securityClearance);
        if (!result.isSuccess()){
            return result;
        }

        if (securityClearance.getSecurityClearanceId() <= 0){
            result.addMessage("securityClearanceId must be set for `update` operation", ResultType.INVALID);
            return result;
        }

        if (!repository.update(securityClearance)){
            String message = String.format("securityClearanceId: %s, not found", securityClearance.getSecurityClearanceId());
            result.addMessage(message, ResultType.NOT_FOUND);
        }

        return result;
    }

    public Result<SecurityClearance> add(SecurityClearance securityClearance) {
        Result<SecurityClearance> result = validate(securityClearance);
        if (!result.isSuccess()){
            return result;
        }

        if (securityClearance.getSecurityClearanceId() != 0){
            result.addMessage("security clearance id cannot be set for `add` operation", ResultType.INVALID);
            return result;
        }

        securityClearance = repository.add(securityClearance);
        result.setPayload(securityClearance);
        return result;
    }

    public Result<Boolean> deleteById(int securityClearanceId) {
        Result<Boolean> result = new Result<>();

        List<AgencyAgent> agencyAgents = agencyAgentRepository.findBySecurityClearanceId(securityClearanceId);

        if (agencyAgents.size() > 0){
            result.addMessage("Security Clearance has AgencyAgents, cannot delete!", ResultType.INVALID);
        } else {
            result.setPayload(repository.deleteById(securityClearanceId));
        }
        return result;

    }

    private Result<SecurityClearance> validate(SecurityClearance securityClearance) {
        Result<SecurityClearance> result = new Result<>();
        if (securityClearance == null) {
            result.addMessage("security clearance cannot be null", ResultType.INVALID);
        }

        if (Validations.isNullOrBlank(securityClearance.getName())) {
            result.addMessage("security clearance name is required", ResultType.INVALID);
        }

        // need to validate that the name is unique
        if (repository.findAll().contains(securityClearance.getName())) {
            result.addMessage("security clearance name must be unique", ResultType.INVALID);
        }

        return result;
    }

}
