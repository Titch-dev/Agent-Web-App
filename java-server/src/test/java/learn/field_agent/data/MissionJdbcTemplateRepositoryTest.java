package learn.field_agent.data;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
class MissionJdbcTemplateRepositoryTest {

    @Autowired
    MissionJdbcTemplateRepository repository;

    @Autowired
    KnownGoodState knownGoodState;


}
