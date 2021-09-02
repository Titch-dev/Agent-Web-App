package learn.field_agent.data;

import learn.field_agent.models.Agent;
import learn.field_agent.models.SecurityClearance;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.jdbc.core.JdbcTemplate;

import static org.junit.jupiter.api.Assertions.*;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
class SecurityClearanceJdbcTemplateRepositoryTest {

    @Autowired
    SecurityClearanceJdbcTemplateRepository repository;

    @Autowired
    KnownGoodState knownGoodState;

    @BeforeEach
    void setup() {
        knownGoodState.set();
    }

//    @Test
//    void shouldDeleteById(){
//        // test - this Id should not delete
//        boolean actual = repository.deleteById(1);
//
//        //test - this Id should delete
//    }

    @Test
    void shouldFindById() {
        SecurityClearance secret = new SecurityClearance(1, "Secret");
        SecurityClearance topSecret = new SecurityClearance(2, "Top Secret");

        SecurityClearance actual = repository.findById(1);
        assertEquals(secret, actual);

        actual = repository.findById(2);
        assertEquals(topSecret, actual);

        actual = repository.findById(4);
        assertEquals(null, actual);
    }

    @Test
    void shouldFindAll() {
        List<SecurityClearance> all = repository.findAll();
        assertNotNull(all);
        assertEquals(3, all.size());
    }

//    @Test
//    void shouldFindByName() {
//        SecurityClearance secret = repository.findByName("Secret");
//        assertEquals(1, secret.getSecurityClearanceId());
//        assertEquals("Secret", secret.getName());
//    }

    @Test
    void shouldAdd(){
        SecurityClearance securityClearance = makeSecurityClearance();
        SecurityClearance actual = repository.add(securityClearance);
        assertNotNull(actual);
        assertEquals(3, actual.getSecurityClearanceId());
    }

    @Test
    void shouldUpdate(){
        SecurityClearance securityClearance = repository.findById(3);
        securityClearance.setName("Test Secret");
        assertTrue(repository.update(securityClearance));
    }

    private SecurityClearance makeSecurityClearance() {
        SecurityClearance securityClearance = new SecurityClearance();
        securityClearance.setName("Test");
        return securityClearance;
    }

}