package sfrerichs.repository;

import sfrerichs.domain.ThingsList;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the ThingsList entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ThingsListRepository extends JpaRepository<ThingsList, Long> {
}
