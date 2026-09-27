export interface KotlinFile {
  name: string;
  path: string;
  description: string;
  code: string;
}

export const KOTLIN_ANDROID_FILES: KotlinFile[] = [
  {
    name: 'MainActivity.kt',
    path: 'app/src/main/java/com/sarkarivacancy/result/MainActivity.kt',
    description: 'Android Entry point with edge-to-edge support & Material 3 Theme setup',
    code: `package com.sarkarivacancy.result

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.ui.Modifier
import androidx.lifecycle.viewmodel.compose.viewModel
import com.sarkarivacancy.result.navigation.SarkariNavHost
import com.sarkarivacancy.result.ui.theme.SarkariVacancyTheme
import com.sarkarivacancy.result.viewmodel.SarkariViewModel

/**
 * Sarkari Vacancy Result - Native Jetpack Compose Entry Activity
 * Architecture: Clean Architecture + MVVM + Jetpack Compose Material 3
 */
class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        // Enable Android Edge-to-Edge display
        enableEdgeToEdge()

        setContent {
            val sarkariViewModel: SarkariViewModel = viewModel()
            
            SarkariVacancyTheme {
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = MaterialTheme.colorScheme.background
                ) {
                    SarkariNavHost(viewModel = sarkariViewModel)
                }
            }
        }
    }
}`
  },
  {
    name: 'SarkariNavHost.kt',
    path: 'app/src/main/java/com/sarkarivacancy/result/navigation/SarkariNavHost.kt',
    description: 'Jetpack Compose Navigation Graph with Bottom Navigation destination routes',
    code: `package com.sarkarivacancy.result.navigation

import androidx.compose.foundation.layout.padding
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material.icons.outlined.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.navigation.NavGraph.Companion.findStartDestination
import androidx.navigation.compose.*
import com.sarkarivacancy.result.ui.screens.*
import com.sarkarivacancy.result.viewmodel.SarkariViewModel

sealed class Screen(val route: String, val titleEn: String, val titleHi: String, val icon: ImageVector) {
    object Jobs : Screen("jobs", "Latest Jobs", "लेटेस्ट जॉब्स", Icons.Default.Work)
    object Results : Screen("results", "Results", "परिणाम", Icons.Default.CheckCircle)
    object AdmitCards : Screen("admit_cards", "Admit Cards", "प्रवेश पत्र", Icons.Default.Badge)
    object Admissions : Screen("admissions", "Admissions", "प्रवेश", Icons.Default.School)
    object StudyMaterial : Screen("study_material", "Study Material", "अध्ययन सामग्री", Icons.Default.MenuBook)
    object Favorites : Screen("favorites", "Saved", "पसंदीदा", Icons.Default.Bookmark)
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun SarkariNavHost(
    viewModel: SarkariViewModel,
    modifier: Modifier = Modifier
) {
    val navController = rememberNavController()
    val navBackStackEntry by navController.currentBackStackEntryAsState()
    val currentRoute = navBackStackEntry?.destination?.route

    val bottomNavItems = listOf(
        Screen.Jobs,
        Screen.Results,
        Screen.AdmitCards,
        Screen.Admissions,
        Screen.Favorites
    )

    Scaffold(
        bottomBar = {
            NavigationBar(
                containerColor = MaterialTheme.colorScheme.surfaceContainer
            ) {
                bottomNavItems.forEach { screen ->
                    val selected = currentRoute == screen.route
                    NavigationBarItem(
                        selected = selected,
                        onClick = {
                            navController.navigate(screen.route) {
                                popUpTo(navController.graph.findStartDestination().id) {
                                    saveState = true
                                }
                                launchSingleTop = true
                                restoreState = true
                            }
                        },
                        icon = { Icon(screen.icon, contentDescription = screen.titleEn) },
                        label = { Text(screen.titleEn, style = MaterialTheme.typography.labelSmall) },
                        colors = NavigationBarItemDefaults.colors(
                            indicatorColor = MaterialTheme.colorScheme.primaryContainer,
                            selectedIconColor = MaterialTheme.colorScheme.onPrimaryContainer
                        )
                    )
                }
            }
        }
    ) { innerPadding ->
        NavHost(
            navController = navController,
            startDestination = Screen.Jobs.route,
            modifier = modifier.padding(innerPadding)
        ) {
            composable(Screen.Jobs.route) {
                LatestJobsScreen(viewModel = viewModel, onJobClick = { jobId ->
                    navController.navigate("job_detail/$jobId")
                })
            }
            composable(Screen.Results.route) {
                ResultsScreen(viewModel = viewModel)
            }
            composable(Screen.AdmitCards.route) {
                AdmitCardsScreen(viewModel = viewModel)
            }
            composable(Screen.Admissions.route) {
                AdmissionsScreen(viewModel = viewModel)
            }
            composable(Screen.Favorites.route) {
                FavoritesScreen(viewModel = viewModel)
            }
            composable("job_detail/{jobId}") { backStackEntry ->
                val jobId = backStackEntry.arguments?.getString("jobId") ?: ""
                JobDetailScreen(jobId = jobId, viewModel = viewModel, onBack = { navController.popBackStack() })
            }
        }
    }
}`
  },
  {
    name: 'SarkariViewModel.kt',
    path: 'app/src/main/java/com/sarkarivacancy/result/viewmodel/SarkariViewModel.kt',
    description: 'State management with Kotlin StateFlow, M3 theme toggling & Filter state',
    code: `package com.sarkarivacancy.result.viewmodel

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.sarkarivacancy.result.data.model.JobItem
import com.sarkarivacancy.result.data.repository.SarkariRepository
import kotlinx.coroutines.flow.*
import kotlinx.coroutines.launch

data class SarkariUiState(
    val isLoading: Boolean = false,
    val jobs: List<JobItem> = emptyList(),
    val favorites: Set<String> = emptySet(),
    val searchQuery: String = "",
    val selectedCategory: String = "all",
    val selectedState: String = "all",
    val isHindi: Boolean = false,
    val isDarkMode: Boolean = false,
    val errorMessage: String? = null
)

class SarkariViewModel(
    private val repository: SarkariRepository = SarkariRepository()
) : ViewModel() {

    private val _uiState = MutableStateFlow(SarkariUiState(isLoading = true))
    val uiState: StateFlow<SarkariUiState> = _uiState.asStateFlow()

    init {
        loadRecruitmentData()
    }

    fun loadRecruitmentData() {
        viewModelScope.launch {
            _uiState.update { it.copy(isLoading = true, errorMessage = null) }
            try {
                val data = repository.getAllRecruitments()
                _uiState.update { it.copy(isLoading = false, jobs = data) }
            } catch (e: Exception) {
                _uiState.update { it.copy(isLoading = false, errorMessage = e.localizedMessage) }
            }
        }
    }

    fun toggleFavorite(jobId: String) {
        _uiState.update { state ->
            val updated = if (state.favorites.contains(jobId)) {
                state.favorites - jobId
            } else {
                state.favorites + jobId
            }
            state.copy(favorites = updated)
        }
    }

    fun setSearchQuery(query: String) {
        _uiState.update { it.copy(searchQuery = query) }
    }

    fun setSelectedCategory(category: String) {
        _uiState.update { it.copy(selectedCategory = category) }
    }

    fun setSelectedState(state: String) {
        _uiState.update { it.copy(selectedState = state) }
    }

    fun toggleLanguage() {
        _uiState.update { it.copy(isHindi = !it.isHindi) }
    }
}`
  },
  {
    name: 'JobCard.kt',
    path: 'app/src/main/java/com/sarkarivacancy/result/ui/components/JobCard.kt',
    description: 'Material 3 Elevated Card composable with unboxed metadata and tactile actions',
    code: `package com.sarkarivacancy.result.ui.components

import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Bookmark
import androidx.compose.material.icons.outlined.BookmarkBorder
import androidx.compose.material.icons.outlined.Share
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import com.sarkarivacancy.result.data.model.JobItem

@Composable
fun JobCard(
    job: JobItem,
    isHindi: Boolean,
    isFavorite: Boolean,
    onCardClick: () -> Unit,
    onToggleFavorite: () -> Unit,
    onShare: () -> Unit,
    modifier: Modifier = Modifier
) {
    ElevatedCard(
        modifier = modifier
            .fillMaxWidth()
            .clickable { onCardClick() },
        shape = RoundedCornerShape(16.dp),
        colors = CardDefaults.elevatedCardColors(
            containerColor = MaterialTheme.colorScheme.surface
        ),
        elevation = CardDefaults.elevatedCardElevation(defaultElevation = 2.dp)
    ) {
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .padding(16.dp)
        ) {
            // Unboxed Metadata Row (Anti-Pill Compliant)
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Text(
                    text = if (isHindi) job.departmentHi else job.department,
                    style = MaterialTheme.typography.labelSmall,
                    color = MaterialTheme.colorScheme.primary,
                    fontWeight = FontWeight.SemiBold
                )
                IconButton(onClick = onToggleFavorite, modifier = Modifier.size(24.dp)) {
                    Icon(
                        imageVector = if (isFavorite) Icons.Default.Bookmark else Icons.Outlined.BookmarkBorder,
                        contentDescription = "Bookmark",
                        tint = if (isFavorite) MaterialTheme.colorScheme.primary else MaterialTheme.colorScheme.onSurfaceVariant
                    )
                }
            }

            Spacer(modifier = Modifier.height(6.dp))

            // Job Title
            Text(
                text = if (isHindi) job.titleHi else job.title,
                style = MaterialTheme.typography.titleMedium,
                fontWeight = FontWeight.Bold,
                color = MaterialTheme.colorScheme.onSurface
            )

            Spacer(modifier = Modifier.height(10.dp))

            // Typographic metadata with clean separators
            Row(
                modifier = Modifier.fillMaxWidth(),
                verticalAlignment = Alignment.CenterVertically
            ) {
                Text(
                    text = "\${job.totalVacancies} Posts",
                    style = MaterialTheme.typography.bodySmall,
                    fontWeight = FontWeight.Medium,
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )
                Text(
                    text = " · ",
                    style = MaterialTheme.typography.bodySmall,
                    color = MaterialTheme.colorScheme.outline
                )
                Text(
                    text = job.state,
                    style = MaterialTheme.typography.bodySmall,
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )
                Text(
                    text = " · ",
                    style = MaterialTheme.typography.bodySmall,
                    color = MaterialTheme.colorScheme.outline
                )
                Text(
                    text = "Last Date: \${job.dates.applicationEnd ?: "Check Notice"}",
                    style = MaterialTheme.typography.bodySmall,
                    color = MaterialTheme.colorScheme.error,
                    fontWeight = FontWeight.Medium
                )
            }

            Spacer(modifier = Modifier.height(12.dp))
            Divider(color = MaterialTheme.colorScheme.surfaceVariant, thickness = 0.5.dp)
            Spacer(modifier = Modifier.height(8.dp))

            // Action Row
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                TextButton(onClick = onShare) {
                    Icon(Icons.Outlined.Share, contentDescription = "Share", modifier = Modifier.size(16.dp))
                    Spacer(modifier = Modifier.width(4.dp))
                    Text(if (isHindi) "साझा करें" else "Share")
                }

                Button(
                    onClick = onCardClick,
                    shape = RoundedCornerShape(8.dp)
                ) {
                    Text(if (isHindi) "विवरण देखें" else "View Details")
                }
            }
        }
    }
}`
  },
  {
    name: 'Theme.kt',
    path: 'app/src/main/java/com/sarkarivacancy/result/ui/theme/Theme.kt',
    description: 'Material 3 Color Scheme with Ashoka Navy & Indian Saffron/Emerald accents',
    code: `package com.sarkarivacancy.result.ui.theme

import android.os.Build
import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext

private val NavyBluePrimary = Color(0xFF1E3A8A)
private val NavyBlueDark = Color(0xFF93C5FD)
private val SaffronAccent = Color(0xFFD97706)
private val EmeraldAccent = Color(0xFF059669)

private val DarkColorScheme = darkColorScheme(
    primary = Color(0xFF90CAF9),
    onPrimary = Color(0xFF0D47A1),
    primaryContainer = Color(0xFF1565C0),
    onPrimaryContainer = Color(0xFFE3F2FD),
    secondary = Color(0xFFFFB74D),
    background = Color(0xFF0F172A),
    surface = Color(0xFF1E293B),
    surfaceContainer = Color(0xFF1E293B),
    onBackground = Color(0xFFF1F5F9),
    onSurface = Color(0xFFF8FAFC)
)

private val LightColorScheme = lightColorScheme(
    primary = Color(0xFF1E3A8A),
    onPrimary = Color.White,
    primaryContainer = Color(0xFFDBEAFE),
    onPrimaryContainer = Color(0xFF1E3A8A),
    secondary = SaffronAccent,
    background = Color(0xFFF8FAFC),
    surface = Color.White,
    surfaceContainer = Color(0xFFF1F5F9),
    onBackground = Color(0xFF0F172A),
    onSurface = Color(0xFF1E293B)
)

@Composable
fun SarkariVacancyTheme(
    darkTheme: Boolean = isSystemInDarkTheme(),
    dynamicColor: Boolean = true,
    content: @Composable () -> Unit
) {
    val colorScheme = when {
        dynamicColor && Build.VERSION.SDK_INT >= Build.VERSION_CODES.S -> {
            val context = LocalContext.current
            if (darkTheme) dynamicDarkColorScheme(context) else dynamicLightColorScheme(context)
        }
        darkTheme -> DarkColorScheme
        else -> LightColorScheme
    }

    MaterialTheme(
        colorScheme = colorScheme,
        typography = Typography(),
        content = content
    )
}`
  },
  {
    name: 'build.gradle.kts',
    path: 'app/build.gradle.kts',
    description: 'Gradle Kotlin DSL dependencies for Compose M3, Navigation, Coroutines & Coil',
    code: `plugins {
    alias(libs.plugins.android.application)
    alias(libs.plugins.kotlin.android)
    alias(libs.plugins.kotlin.compose)
}

android {
    namespace = "com.sarkarivacancy.result"
    compileSdk = 35

    defaultConfig {
        applicationId = "com.sarkarivacancy.result"
        minSdk = 26
        targetSdk = 35
        versionCode = 1
        versionName = "1.0.0"

        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
    }

    buildTypes {
        release {
            isMinifyEnabled = true
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro"
            )
        }
    }
    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }
    kotlinOptions {
        jvmTarget = "17"
    }
    buildFeatures {
        compose = true
    }
}

dependencies {
    implementation(platform("androidx.compose:compose-bom:2024.10.00"))
    implementation("androidx.compose.ui:ui")
    implementation("androidx.compose.material3:material3:1.3.1")
    implementation("androidx.compose.material:material-icons-extended")
    implementation("androidx.navigation:navigation-compose:2.8.3")
    implementation("androidx.lifecycle:lifecycle-viewmodel-compose:2.8.6")
    implementation("androidx.activity:activity-compose:1.9.3")
    implementation("org.jetbrains.kotlinx:kotlinx-coroutines-android:1.8.1")
    implementation("io.coil-kt:coil-compose:2.7.0")
}`
  }
];
