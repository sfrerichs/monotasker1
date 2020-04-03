package sfrerichs.web.rest;

import sfrerichs.domain.ThingsList;
import sfrerichs.repository.ThingsListRepository;
import sfrerichs.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link sfrerichs.domain.ThingsList}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ThingsListResource {

    private final Logger log = LoggerFactory.getLogger(ThingsListResource.class);

    private static final String ENTITY_NAME = "thingsList";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ThingsListRepository thingsListRepository;

    public ThingsListResource(ThingsListRepository thingsListRepository) {
        this.thingsListRepository = thingsListRepository;
    }

    /**
     * {@code POST  /things-lists} : Create a new thingsList.
     *
     * @param thingsList the thingsList to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new thingsList, or with status {@code 400 (Bad Request)} if the thingsList has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/things-lists")
    public ResponseEntity<ThingsList> createThingsList(@RequestBody ThingsList thingsList) throws URISyntaxException {
        log.debug("REST request to save ThingsList : {}", thingsList);
        if (thingsList.getId() != null) {
            throw new BadRequestAlertException("A new thingsList cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ThingsList result = thingsListRepository.save(thingsList);
        return ResponseEntity.created(new URI("/api/things-lists/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /things-lists} : Updates an existing thingsList.
     *
     * @param thingsList the thingsList to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated thingsList,
     * or with status {@code 400 (Bad Request)} if the thingsList is not valid,
     * or with status {@code 500 (Internal Server Error)} if the thingsList couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/things-lists")
    public ResponseEntity<ThingsList> updateThingsList(@RequestBody ThingsList thingsList) throws URISyntaxException {
        log.debug("REST request to update ThingsList : {}", thingsList);
        if (thingsList.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ThingsList result = thingsListRepository.save(thingsList);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, thingsList.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /things-lists} : get all the thingsLists.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of thingsLists in body.
     */
    @GetMapping("/things-lists")
    public ResponseEntity<List<ThingsList>> getAllThingsLists(Pageable pageable) {
        log.debug("REST request to get a page of ThingsLists");
        Page<ThingsList> page = thingsListRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /things-lists/:id} : get the "id" thingsList.
     *
     * @param id the id of the thingsList to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the thingsList, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/things-lists/{id}")
    public ResponseEntity<ThingsList> getThingsList(@PathVariable Long id) {
        log.debug("REST request to get ThingsList : {}", id);
        Optional<ThingsList> thingsList = thingsListRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(thingsList);
    }

    /**
     * {@code DELETE  /things-lists/:id} : delete the "id" thingsList.
     *
     * @param id the id of the thingsList to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/things-lists/{id}")
    public ResponseEntity<Void> deleteThingsList(@PathVariable Long id) {
        log.debug("REST request to delete ThingsList : {}", id);
        thingsListRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
