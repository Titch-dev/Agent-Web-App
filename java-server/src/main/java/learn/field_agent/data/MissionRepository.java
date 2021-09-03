package learn.field_agent.data;

import learn.field_agent.models.Mission;

public interface MissionRepository {
    Mission findById(int missionId);

    Mission add(Mission mission);

    boolean update(Mission mission);

    boolean deleteById(int missionId);
}
