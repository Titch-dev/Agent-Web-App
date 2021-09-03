package learn.field_agent.data;

import learn.field_agent.data.mappers.MissionMapper;
import learn.field_agent.models.Mission;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class MissionJdbcTemplateRepository implements MissionRepository {

    private final JdbcTemplate jdbcTemplate;

    public MissionJdbcTemplateRepository(JdbcTemplate jdbcTemplate){
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public Mission findById(int missionId) {

        final String sql = "select mission_id, code_name, notes, start_date, projected_end_date, actual_end_date, operational_cost, agency_id " +
                "from mission " +
                "where mission_id = ?;";
        return jdbcTemplate.query(sql, new MissionMapper(), missionId).stream()
                .findFirst()
                .orElse(null);
    }

    @Override
    public Mission add(Mission mission) {
        return null;
    }

    @Override
    public boolean update(Mission mission) {
        return false;
    }

    @Override
    public boolean deleteById(int missionId) {
        return false;
    }
}
