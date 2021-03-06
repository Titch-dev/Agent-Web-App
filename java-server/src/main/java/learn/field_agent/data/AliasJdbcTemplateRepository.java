package learn.field_agent.data;

import learn.field_agent.data.mappers.AliasMapper;
import learn.field_agent.data.mappers.SecurityClearanceMapper;
import learn.field_agent.models.Alias;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;
import java.util.List;

import java.sql.PreparedStatement;
import java.sql.Statement;

@Repository
public class AliasJdbcTemplateRepository implements AliasRepository{

    private final JdbcTemplate jdbcTemplate;

    public AliasJdbcTemplateRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public Alias findById(int aliasId) {
        final String sql = "select * from alias where alias_id = ?";

        return jdbcTemplate.queryForObject(sql, new AliasMapper(), aliasId);
    }

    @Override
    public Alias add(Alias alias) {

        final String sql = "insert into alias (name, persona, agent_id) " +
                           "values (?,?,?);";

        KeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, alias.getName());
            ps.setString(2, alias.getPersona());
            ps.setInt(3, alias.getAgentId());
            return ps;
        }, keyHolder);

        if (rowsAffected <= 0) {
            return null;
        }

        alias.setAliasId(keyHolder.getKey().intValue());
        return alias;
    }

    @Override
    public boolean update(Alias alias) {

        // not updating agent_id
        final String sql = "update alias set " +
                "name = ?, " +
                "persona = ? " +
                "where alias_id = ?;";

        return jdbcTemplate.update(sql,
                alias.getName(),
                alias.getPersona(),
                alias.getAliasId()) > 0;
    }

    @Override
    public boolean deleteById(int aliasId) {
        return jdbcTemplate.update("delete from alias where alias_id = ?;", aliasId) > 0;
    }

    @Override
    public List<Alias> findByName(String name) {
        final String sql = "select * from alias where name = ?";
        return jdbcTemplate.query(sql, new AliasMapper(), name);
    }

    @Override
    public List<Alias> findByAgentId(int agentId) {
        final String sql = "select * from alias where agent_id = ?";
        return jdbcTemplate.query(sql, new AliasMapper(), agentId);
    }
}
