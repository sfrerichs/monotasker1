package sfrerichs.web.rest;

import sfrerichs.MonotaskerApp;
import sfrerichs.domain.ThingsList;
import sfrerichs.repository.ThingsListRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import sfrerichs.domain.enumeration.Time;
/**
 * Integration tests for the {@link ThingsListResource} REST controller.
 */
@SpringBootTest(classes = MonotaskerApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class ThingsListResourceIT {

    private static final LocalDate DEFAULT_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final Time DEFAULT_LIST_TIME = Time.MORNING;
    private static final Time UPDATED_LIST_TIME = Time.AFTERNOON;

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    @Autowired
    private ThingsListRepository thingsListRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restThingsListMockMvc;

    private ThingsList thingsList;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ThingsList createEntity(EntityManager em) {
        ThingsList thingsList = new ThingsList()
            .date(DEFAULT_DATE)
            .listTime(DEFAULT_LIST_TIME)
            .description(DEFAULT_DESCRIPTION);
        return thingsList;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ThingsList createUpdatedEntity(EntityManager em) {
        ThingsList thingsList = new ThingsList()
            .date(UPDATED_DATE)
            .listTime(UPDATED_LIST_TIME)
            .description(UPDATED_DESCRIPTION);
        return thingsList;
    }

    @BeforeEach
    public void initTest() {
        thingsList = createEntity(em);
    }

    @Test
    @Transactional
    public void createThingsList() throws Exception {
        int databaseSizeBeforeCreate = thingsListRepository.findAll().size();

        // Create the ThingsList
        restThingsListMockMvc.perform(post("/api/things-lists")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(thingsList)))
            .andExpect(status().isCreated());

        // Validate the ThingsList in the database
        List<ThingsList> thingsListList = thingsListRepository.findAll();
        assertThat(thingsListList).hasSize(databaseSizeBeforeCreate + 1);
        ThingsList testThingsList = thingsListList.get(thingsListList.size() - 1);
        assertThat(testThingsList.getDate()).isEqualTo(DEFAULT_DATE);
        assertThat(testThingsList.getListTime()).isEqualTo(DEFAULT_LIST_TIME);
        assertThat(testThingsList.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
    }

    @Test
    @Transactional
    public void createThingsListWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = thingsListRepository.findAll().size();

        // Create the ThingsList with an existing ID
        thingsList.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restThingsListMockMvc.perform(post("/api/things-lists")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(thingsList)))
            .andExpect(status().isBadRequest());

        // Validate the ThingsList in the database
        List<ThingsList> thingsListList = thingsListRepository.findAll();
        assertThat(thingsListList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllThingsLists() throws Exception {
        // Initialize the database
        thingsListRepository.saveAndFlush(thingsList);

        // Get all the thingsListList
        restThingsListMockMvc.perform(get("/api/things-lists?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(thingsList.getId().intValue())))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())))
            .andExpect(jsonPath("$.[*].listTime").value(hasItem(DEFAULT_LIST_TIME.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)));
    }
    
    @Test
    @Transactional
    public void getThingsList() throws Exception {
        // Initialize the database
        thingsListRepository.saveAndFlush(thingsList);

        // Get the thingsList
        restThingsListMockMvc.perform(get("/api/things-lists/{id}", thingsList.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(thingsList.getId().intValue()))
            .andExpect(jsonPath("$.date").value(DEFAULT_DATE.toString()))
            .andExpect(jsonPath("$.listTime").value(DEFAULT_LIST_TIME.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION));
    }

    @Test
    @Transactional
    public void getNonExistingThingsList() throws Exception {
        // Get the thingsList
        restThingsListMockMvc.perform(get("/api/things-lists/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateThingsList() throws Exception {
        // Initialize the database
        thingsListRepository.saveAndFlush(thingsList);

        int databaseSizeBeforeUpdate = thingsListRepository.findAll().size();

        // Update the thingsList
        ThingsList updatedThingsList = thingsListRepository.findById(thingsList.getId()).get();
        // Disconnect from session so that the updates on updatedThingsList are not directly saved in db
        em.detach(updatedThingsList);
        updatedThingsList
            .date(UPDATED_DATE)
            .listTime(UPDATED_LIST_TIME)
            .description(UPDATED_DESCRIPTION);

        restThingsListMockMvc.perform(put("/api/things-lists")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedThingsList)))
            .andExpect(status().isOk());

        // Validate the ThingsList in the database
        List<ThingsList> thingsListList = thingsListRepository.findAll();
        assertThat(thingsListList).hasSize(databaseSizeBeforeUpdate);
        ThingsList testThingsList = thingsListList.get(thingsListList.size() - 1);
        assertThat(testThingsList.getDate()).isEqualTo(UPDATED_DATE);
        assertThat(testThingsList.getListTime()).isEqualTo(UPDATED_LIST_TIME);
        assertThat(testThingsList.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
    }

    @Test
    @Transactional
    public void updateNonExistingThingsList() throws Exception {
        int databaseSizeBeforeUpdate = thingsListRepository.findAll().size();

        // Create the ThingsList

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restThingsListMockMvc.perform(put("/api/things-lists")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(thingsList)))
            .andExpect(status().isBadRequest());

        // Validate the ThingsList in the database
        List<ThingsList> thingsListList = thingsListRepository.findAll();
        assertThat(thingsListList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteThingsList() throws Exception {
        // Initialize the database
        thingsListRepository.saveAndFlush(thingsList);

        int databaseSizeBeforeDelete = thingsListRepository.findAll().size();

        // Delete the thingsList
        restThingsListMockMvc.perform(delete("/api/things-lists/{id}", thingsList.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ThingsList> thingsListList = thingsListRepository.findAll();
        assertThat(thingsListList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
