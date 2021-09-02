package learn.field_agent.data;

import learn.field_agent.models.Alias;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
public class AliasJdbcTemplateRepositoryTest {

    @Autowired
    AliasJdbcTemplateRepository repository;

    @Autowired
    KnownGoodState knownGoodState;

    Alias expected;
    Alias expected2;

    @BeforeEach
    void setup(){

        knownGoodState.set();

        expected = new Alias();
        expected.setName("spy");
        expected.setPersona("testspy");
        expected.setAgentId(1);
        expected = repository.add(expected);

        expected2 = new Alias();
        expected2.setName("spy");
        expected2.setPersona("testspy");
        expected2.setAgentId(3);
        expected2 = repository.add(expected2);
    }

    @Test
    void findById(){
        Alias actual = repository.findById(expected.getAliasId());
        assertEquals(expected.getAliasId(), actual.getAliasId());
    }

    @Test
    void shouldUpdate() {
        expected.setPersona("testing");
        repository.update(expected);
        Alias actual = repository.findById(expected.getAliasId());
        assertEquals(expected.getPersona(), actual.getPersona());
    }

    @Test
    void shouldDelete(){
        boolean actual = repository.deleteById(expected.getAliasId());
        assertEquals(true, actual);
    }

    @Test
    void shouldFindByName(){
        List<Alias> aliasList = repository.findByName(expected.getName());
        assertEquals(2, aliasList.size());
    }

}
