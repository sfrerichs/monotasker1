package sfrerichs.web.rest;

import sfrerichs.domain.OneThingList;
import sfrerichs.repository.OneThingListRepository;
import sfrerichs.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

/**
 * REST controller for managing {@link sfrerichs.domain.OneThingList}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class OneThingListResource {

    private final Logger log = LoggerFactory.getLogger(OneThingListResource.class);

    private static final String ENTITY_NAME = "oneThingList";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final OneThingListRepository oneThingListRepository;

    public OneThingListResource(OneThingListRepository oneThingListRepository) {
        this.oneThingListRepository = oneThingListRepository;
    }

    /**
     * {@code POST  /one-thing-lists} : Create a new oneThingList.
     *
     * @param oneThingList the oneThingList to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new oneThingList, or with status {@code 400 (Bad Request)} if the oneThingList has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/one-thing-lists")
    public ResponseEntity<OneThingList> createOneThingList(@RequestBody OneThingList oneThingList) throws URISyntaxException {
        log.debug("REST request to save OneThingList : {}", oneThingList);
        if (oneThingList.getId() != null) {
            throw new BadRequestAlertException("A new oneThingList cannot already have an ID", ENTITY_NAME, "idexists");
        }
        OneThingList result = oneThingListRepository.save(oneThingList);
        return ResponseEntity.created(new URI("/api/one-thing-lists/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /one-thing-lists} : Updates an existing oneThingList.
     *
     * @param oneThingList the oneThingList to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated oneThingList,
     * or with status {@code 400 (Bad Request)} if the oneThingList is not valid,
     * or with status {@code 500 (Internal Server Error)} if the oneThingList couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/one-thing-lists")
    public ResponseEntity<OneThingList> updateOneThingList(@RequestBody OneThingList oneThingList) throws URISyntaxException {
        log.debug("REST request to update OneThingList : {}", oneThingList);
        if (oneThingList.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        OneThingList result = oneThingListRepository.save(oneThingList);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, oneThingList.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /one-thing-lists} : get all the oneThingLists.
     *
     * @param filter the filter of the request.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of oneThingLists in body.
     */
    @GetMapping("/one-thing-lists")
    public List<OneThingList> getAllOneThingLists(@RequestParam(required = false) String filter) {
        if ("thingslist-is-null".equals(filter)) {
            log.debug("REST request to get all OneThingLists where thingsList is null");
            return StreamSupport
                .stream(oneThingListRepository.findAll().spliterator(), false)
                .filter(oneThingList -> oneThingList.getThingsList() == null)
                .collect(Collectors.toList());
        }
        log.debug("REST request to get all OneThingLists");
        return oneThingListRepository.findAll();
    }

    /**
     * {@code GET  /one-thing-lists/:id} : get the "id" oneThingList.
     *
     * @param id the id of the oneThingList to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the oneThingList, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/one-thing-lists/{id}")
    public ResponseEntity<OneThingList> getOneThingList(@PathVariable Long id) {
        log.debug("REST request to get OneThingList : {}", id);
        Optional<OneThingList> oneThingList = oneThingListRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(oneThingList);
    }

    /**
     * {@code DELETE  /one-thing-lists/:id} : delete the "id" oneThingList.
     *
     * @param id the id of the oneThingList to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/one-thing-lists/{id}")
    public ResponseEntity<Void> deleteOneThingList(@PathVariable Long id) {
        log.debug("REST request to delete OneThingList : {}", id);
        oneThingListRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
