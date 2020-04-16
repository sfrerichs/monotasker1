package sfrerichs.repository;

import sfrerichs.domain.OneThingList;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the OneThingList entity.
 */
@SuppressWarnings("unused")
@Repository
public interface OneThingListRepository extends JpaRepository<OneThingList, Long> {
}
